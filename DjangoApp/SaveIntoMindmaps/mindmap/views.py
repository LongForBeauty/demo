from django.shortcuts import render, get_object_or_404
from mindmap.forms import UserSelectionForm, UserSelectionCommentForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
# Create your views here.
def SaveEntry(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect("user_login/")

    user_id = request.session['_auth_user_id']
    user = get_object_or_404(User, pk=user_id)

    if request.method == "POST":
        user_selection_form = UserSelectionForm(data=request.POST)
        user_comment_form = UserSelectionCommentForm(data=request.POST)

        for key, value in request.session.items(): print('{} => {}'.format(key, value))
        if user_selection_form.is_valid() and user_comment_form.is_valid():
            user_selection = user_selection_form.save()
            user_selection.save()

            user_comment = user_comment_form.save(commit=False)
            user_comment.text_content = user_selection
            user_comment.user = user
            user_comment.save()
        else:
            print(user_selection_form.errors, user_comment_form.errors)

    else:
        user_selection_form = UserSelectionForm()
        user_comment_form = UserSelectionCommentForm()

    return render(request, 'index.html', {'user_selection':user_selection_form,
                                          'user_comment':user_comment_form})
