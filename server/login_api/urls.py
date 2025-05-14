from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import RegisterView, TaskView, TaskUpdateDelete

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('tasks/', TaskView.as_view(), name='task_list'),
    path('tasks/<int:pk>/', TaskUpdateDelete.as_view(), name='task_detail'),
]

