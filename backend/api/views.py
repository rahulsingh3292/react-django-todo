from rest_framework.views import APIView
from  .models import Todo ,User
from rest_framework.response import Response 
from django.shortcuts import render
from rest_framework import serializers 
from django.contrib.auth import authenticate 
from django.core.exceptions import ObjectDoesNotExist 
from rest_framework.authentication import TokenAuthentication 
from rest_framework.permissions import IsAuthenticated 
from rest_framework.authtoken.models import Token 

 

def user_detail(user):
  token = Token.objects.get(user=user)
  return {
    "name":user.first_name,
    "token":token.key
    }

class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo 
    fields = "__all__" 

def home(request):
  return render(request,"api.html")

class RegisterApi(APIView):

  def post(self,request):
    username = request.data["username"]
    name = request.data["name"]
    password = request.data["password"]
    
    if User.objects.filter(username=username).exists():
      return Response({"error":"user already exists.."},status=409)
    
    user = User(username=username,first_name=name)
    user.set_password(password)
    user.save() 
    Token.objects.create(user=user)
    return Response({"status":"registration success"},status=201)
 
 
class LoginApi(APIView):
  def post(self,request):
    username =request.data["username"]
    password= request.data["password"]
    user = authenticate(username=username,password=password)
    if user is not None:
      return Response({"user":user_detail(user)},status=200)
    return Response(status=401)


class TodoApi(APIView):
  authentication_classes =[TokenAuthentication]
  permission_classes = [IsAuthenticated]
  
  def get(self,request):
    user = request.user
    serializer = TodoSerializer(Todo.objects.filter(user=user),many=True)
    return Response(serializer.data,status=200)

class AddTodoApi(APIView):
  authentication_classes =[TokenAuthentication]
  permission_classes = [IsAuthenticated]
  
  def post(self,request):
    data = request.data 
    data["user"] = request.user.id
    serializer = TodoSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data,status=201)
    return Response(serializer.errors)
    
class EditTodoApi(APIView):
  authentication_classes =[TokenAuthentication]
  permission_classes = [IsAuthenticated]
  
  def patch(self,request,id):
    try:
      todo = Todo.objects.get(id=id)
    except ObjectDoesNotExist:
      return Response({"msg":"Todo not found.."},status=404)
    
    data = request.data 
    data["user"]=request.user.id
    serializer = TodoSerializer(instance=todo,data=data,partial=True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data,status=200)
    return Response(serializer.errors)

class DeleteTodoApi(APIView):
  authentication_classes =[TokenAuthentication]
  permission_classes = [IsAuthenticated]
  
  def delete(self,request,id):
    try:
      todo = Todo.objects.get(id=id)
    except ObjectDoesNotExist:
      return Response({"msg":"todo not found.."},status=404)
    todo.delete() 
    return Response(status=200)

