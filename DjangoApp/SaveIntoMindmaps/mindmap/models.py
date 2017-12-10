from django.db import models
from django.contrib.auth.models import User
import user_authentication

# Create your models here.
class UserSelection(models.Model):
    text_content = models.CharField(max_length=255)

    def __str__(self):
        return self.text_content

class UserSelectionComment(models.Model):
    user = models.ForeignKey(User)
    text_content = models.ForeignKey('UserSelection')
    user_comment = models.CharField(max_length=255)
    parent_node = models.CharField(max_length=50)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return u"User: %s SavedText: %s" % (self.user, self.text_content)
