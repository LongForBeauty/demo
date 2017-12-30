from django import forms
from mindmap.models import Selection, SelectionUsersComments

class SelectionForm(forms.ModelForm):
    text_content = forms.CharField(widget = forms.Textarea, label='Your content')
    class Meta():
        model = Selection
        fields = ('text_content',)

class SelectionUsersCommentsForm(forms.ModelForm):
    user_comment = forms.CharField(label='Your comment')
    topic = forms.CharField(label='Topic')
    class Meta():
        model = SelectionUsersComments
        fields = ('user_comment', 'topic',)
