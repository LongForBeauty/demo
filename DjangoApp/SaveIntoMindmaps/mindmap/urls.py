from django.conf.urls import url
from . import views

#TEMPLATE URLS!
app_name = 'mindmap'

urlpatterns = [
    url(r'^result/', views.mindmap, name='mindmap'),
    url(r'^SaveUserSelection/', views.SaveUserSelection, name='SaveUserSelection'),
]
