from django import forms
from mindmap.models import UserSelection, UserSelectionComment

class UserSelectionForm(forms.ModelForm):
    text_content = forms.CharField(widget = forms.Textarea, label='Your content')
    class Meta():
        model = UserSelection
        fields = ('text_content',)

class UserSelectionCommentForm(forms.ModelForm):
    user_comment = forms.CharField(label='Your comment')
    parent_node = forms.CharField(label='Topic')
    class Meta():
        model = UserSelectionComment
        fields = ('user_comment','parent_node')
