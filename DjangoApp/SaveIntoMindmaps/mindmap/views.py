from django.shortcuts import render, get_object_or_404
from mindmap.forms import UserSelectionForm, UserSelectionCommentForm
from mindmap.models import UserSelectionComment
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie 

# Create your views here.
@ensure_csrf_cookie
def SaveUserSelection(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect("/user/user_login/")

    #Retrieve the current logged-in 'user' object
    user_id = request.session['_auth_user_id']
    user = get_object_or_404(User, pk=user_id)

    if request.method == "POST":
        user_selection_form = UserSelectionForm(data=request.POST)
        user_comment_form = UserSelectionCommentForm(data=request.POST)

        if user_selection_form.is_valid() and user_comment_form.is_valid():
            user_selection = user_selection_form.save()
            user_selection.save()

            user_comment = user_comment_form.save(commit=False)
            user_comment.text_content = user_selection
            user_comment.user = user
            user_comment.save()

        else:
            print(user_selection_form.errors, user_comment_form.errors)
        #Empty the form after saving the content into the databaes
        user_selection_form = UserSelectionForm()
        user_comment_form = UserSelectionCommentForm()
    else:
        user_selection_form = UserSelectionForm()
        user_comment_form = UserSelectionCommentForm()

    return HttpResponse("Saved successfully!")

@ensure_csrf_cookie
def SaveEntry(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect("/user/user_login/")

    #Assume the content hasn't been saved
    saved = False
    #Retrieve the current logged-in 'user' object
    user_id = request.session['_auth_user_id']
    user = get_object_or_404(User, pk=user_id)

    if request.method == "POST":
        user_selection_form = UserSelectionForm(data=request.POST)
        user_comment_form = UserSelectionCommentForm(data=request.POST)

        #for key, value in request.session.items(): print('{} => {}'.format(key, value))
        if user_selection_form.is_valid() and user_comment_form.is_valid():
            user_selection = user_selection_form.save()
            user_selection.save()

            user_comment = user_comment_form.save(commit=False)
            user_comment.text_content = user_selection
            user_comment.user = user
            user_comment.save()

            saved = True
        else:
            print(user_selection_form.errors, user_comment_form.errors)

        #Empty the form after saving the content into the databaes
        user_selection_form = UserSelectionForm()
        user_comment_form = UserSelectionCommentForm()
    else:
        user_selection_form = UserSelectionForm()
        user_comment_form = UserSelectionCommentForm()


    return render(request, 'index.html', {'user_selection':user_selection_form,
                                          'user_comment':user_comment_form,
                                          'saved':saved})

def mindmap(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect("/user/user_login/")

    #Retrieve the current logged-in 'user' object
    user_id = request.session['_auth_user_id']
    user = get_object_or_404(User, pk=user_id)

    all_entries = UserSelectionComment.objects.all().filter(user_id=user_id)

    return render(request, 'mindmap/mindmaps.html', {'entries':all_entries})
