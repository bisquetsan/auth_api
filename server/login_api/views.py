# views.py
from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer, TaskSerializer
from rest_framework.permissions import AllowAny
from .models import Task

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Permitir a cualquiera registrarse

class TaskView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TaskSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)
    def get_queryset(self):
        # Filtra las tareas del usuario actual
        return Task.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        # Asigna automáticamente el usuario al crear una tarea
        serializer.save(user=self.request.user)
    
class TaskUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer