from django import forms
from mindmap.models import UserSelection, UserSelectionComment

class UserSelectionForm(forms.ModelForm):
    class Meta():
        model = UserSelection
        fields = ('text_content',)

class UserSelectionCommentForm(forms.ModelForm):
    class Meta():
        model = UserSelectionComment
        fields = ('user_comment','parent_node')
