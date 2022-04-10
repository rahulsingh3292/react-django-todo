
from django.contrib import admin
from django.urls import path
from api import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path("",views.home),
    path("api/register/",views.RegisterApi.as_view()),
    path("api/login/",views.LoginApi.as_view()),
    path("api/get-todos/",views.TodoApi.as_view()),
    path("api/add-todo/",views.AddTodoApi.as_view()),
    path("api/edit-todo/<int:id>/",views.EditTodoApi.as_view()),
    path("api/delete-todo/<int:id>/",views.DeleteTodoApi.as_view()),
    
]

