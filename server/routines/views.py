from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from server import firebase

def generateRoutinesListWithPosesData(posesList, routineList):
  completeList = []
  routineSet = set(routineList)
  for pose in posesList:
    if pose['id'] in routineSet:
      completeList.append(pose)
  return completeList
  
class RoutinesView(APIView):
  def get(self, request):
    poses = firebase.getPoses()
    routines = firebase.getRoutines()
    print(routines)
    print(poses)
    resultDict = {}
    for routine in routines:
      name = routine
      resultList = generateRoutinesListWithPosesData(poses, routines[routine])
      resultDict[name] = resultList
      print(resultDict)
    return Response(resultDict)