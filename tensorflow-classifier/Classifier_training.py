#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed May 12 17:09:07 2021

@author: mihael
"""

import os
import warnings
import numpy as np
import tensorflow as tf
import tensorflowjs as tfjs
import tensorflow_hub as hub
import matplotlib.pyplot as plt
from sklearn.metrics import f1_score
from tensorflow.keras.preprocessing.image import ImageDataGenerator

warnings.filterwarnings('ignore')

# Load Model
model = hub.load('./MobileNetV2')
movenet = model.signatures['serving_default']

# Single image approach
# file = tf.io.read_file('./images/catPose/catPose.jpg')
# file = tf.compat.v1.image.decode_jpeg(file)
# image = tf.expand_dims(image[0], axis = 0)
# image = tf.cast(tf.image.resize_with_pad(image, 256, 256), dtype = tf.int32)

# outputs = movenet(image)
# keypoints = np.squeeze(outputs['output_0'].numpy())

# Generator for data augmentation
data_augmentation = ImageDataGenerator(
    rotation_range = 5,
    zoom_range = .20,
    horizontal_flip = True,
    vertical_flip = False,
    data_format = 'channels_last',
)

# Pass images through generator
n_folders = os.listdir('./images/')
for pose in n_folders:
    if pose == 'idlePosition': continue

    image_generator = data_augmentation.flow_from_directory(
        './images',
        target_size = (256, 256),
        batch_size = len(n_folders), # we will create one image class per batch
        seed = 13,
    )

    # Loop through iterations of the generator to create a dataset for training
    iterations = 50
    class_index = image_generator.class_indices
    class_weights = {0: 1 / (27 * iterations), 1: 1 / iterations}
    dataset = np.zeros(
        (image_generator.batch_size * iterations, 39 + len(class_index)),
        dtype = np.float32
    )

    indexer = 0
    for i in range(iterations):
        images, labels = next(image_generator)

        for image, label in zip(images, labels):
            image = tf.cast(image[np.newaxis,], dtype = tf.int32)
            outputs = movenet(image)
            keypoints = np.squeeze(outputs['output_0'].numpy())

            data = np.mean(keypoints[:5,:], axis = 0)
            data = [*data, *keypoints[5:,:].flatten()]
            dataset[indexer,:] = [*data, *label]
            indexer += 1

    # Visualization - In case you want to see any images
    # fig, ax = plt.subplots()
    # ax.imshow(np.squeeze(image.numpy()))
    # ax.scatter(keypoints[:,1] * 256, keypoints[:,0] * 256)

    # A bit of clean up
    del i, indexer, iterations, data, image_generator
    del label, labels, image, images, outputs, keypoints

    ###### Build classification model as a shallow neural network
    labels_column_index = dataset.shape[1] - len(class_index)
    classifier = tf.keras.models.Sequential()
    classifier.add(
        tf.keras.layers.Dense(
            16,
            input_dim = labels_column_index,
            activation = 'relu'
        )
    )
    classifier.add(tf.keras.layers.Dense(32, activation = 'relu'))
    classifier.add(tf.keras.layers.Dense(1, activation = 'sigmoid'))

    classifier.compile(
        loss = 'binary_crossentropy',
        optimizer = 'adam',
        metrics = [
            tf.keras.metrics.FalseNegatives(name="fn"),
            tf.keras.metrics.FalsePositives(name="fp"),
            tf.keras.metrics.TrueNegatives(name="tn"),
            tf.keras.metrics.TruePositives(name="tp"),
            tf.keras.metrics.Precision(name="precision"),
            tf.keras.metrics.Recall(name="recall")
        ]
    )

    ####### Re-arrange data for a binary classification approach
    train_test_split = int(np.floor(dataset.shape[0] * .8)) # 80/20% split

    X = dataset[:,:labels_column_index]
    y = dataset[:, labels_column_index + class_index[pose]]

    X_train = X[:train_test_split,:]
    X_test = X[train_test_split:,:]

    y_train = y[:train_test_split]
    y_test = y[train_test_split:]

    # Train the model on the data
    history = classifier.fit(
        X_train,
        y_train,
        epochs = 100,
        batch_size = 16,
        class_weight = class_weights,
        verbose = 0
    )

    # Run on the remaining data to test the implementation
    predictions = classifier.predict(X_test)
    pred_labels = np.round(predictions)

    test_accuracy = f1_score(y_test, pred_labels)
    print('F1 score of the ' + pose + ': ' + str(test_accuracy))

    # Conversion to tensroflow JS for web
    folder = './tfjs_per_pose/' + pose
    tfjs.converters.save_keras_model(classifier, folder)

    del X, y, X_train, X_test, y_train, y_test, class_index, history, folder
    del dataset, labels_column_index, pred_labels, predictions
    del test_accuracy, train_test_split, class_weights