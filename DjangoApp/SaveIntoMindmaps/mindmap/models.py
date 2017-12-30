from django.db import models
from django.contrib.auth.models import User
import user_authentication

# Create your models here.
class Selection(models.Model):
    text_content = models.CharField(max_length=255)

    def __str__(self):
        return self.text_content

class SelectionUsers(models.Model):
    selection = models.ForeignKey('Selection')
    user = models.ForeignKey(User)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return u"Selection: %s Users: %s" % (self.selection, self.user)

class SelectionUsersComments(models.Model):
    selection = models.ForeignKey('Selection')
    user = models.ForeignKey(User)
    user_comment = models.CharField(max_length=255)
    topic = models.CharField(max_length=50)

    def __str__(self):
        return u"Selection: %s User: %s Comment: %s Topic: %s" % (self.selection,
                                                        self.user,
                                                        self.user_comment,
                                                        self.topic)
