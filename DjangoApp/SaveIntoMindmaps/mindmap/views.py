from django.shortcuts import render, get_object_or_404
from mindmap.forms import SelectionForm, SelectionUsersCommentsForm
from mindmap.models import SelectionUsersComments
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt

# Create your views here.
#@ensure_csrf_cookie
@csrf_exempt
def SaveUserSelection(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect("http://127.0.0.1:8000/user/user_login/")

    #Retrieve the current logged-in 'user' object
    user_id = request.session['_auth_user_id']
    user = get_object_or_404(User, pk=user_id)

    if request.method == "POST":
        selection_form = SelectionForm(data=request.POST)
        user_comment_form = SelectionUsersCommentsForm(data=request.POST)


        if selection_form.is_valid() and user_comment_form.is_valid() :
            user_selection = selection_form.save()
            user_selection.save()

            user_comment = user_comment_form.save(commit=False)
            user_comment.selection = user_selection
            user_comment.user = user
            user_comment.save()

        else:
            print(selection_form.errors, user_comment_form.errors)
        #Empty the form after saving the content into the databaes
        selection_form = SelectionForm()
        user_comment_form = SelectionUsersCommentsForm()
    else:
        selection_form = SelectionForm()
        user_comment_form = SelectionUsersCommentsForm()

    return HttpResponse("Saved successfully!")

@ensure_csrf_cookie
def SaveEntry(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect("http://127.0.0.1:8000/user/user_login/")

    #Assume the content hasn't been saved
    saved = False
    #Retrieve the current logged-in 'user' object
    user_id = request.session['_auth_user_id']
    user = get_object_or_404(User, pk=user_id)

    if request.method == "POST":
        selection_form = SelectionForm(data=request.POST)
        user_comment_form = SelectionUsersCommentsForm(data=request.POST)

        if selection_form.is_valid() and user_comment_form.is_valid() :
            user_selection = selection_form.save()
            user_selection.save()

            user_comment = user_comment_form.save(commit=False)
            user_comment.selection = user_selection
            user_comment.user = user
            user_comment.save()
        else:
            print(selection_form.errors, user_comment_form.errors)
        #Empty the form after saving the content into the databaes
        selection_form = SelectionForm()
        user_comment_form = SelectionUsersCommentsForm()
    else:
        selection_form = SelectionForm()
        user_comment_form = SelectionUsersCommentsForm()

    return render(request, 'index.html', {'user_selection':selection_form,
                                          'user_comments':user_comment_form,
                                          'saved':saved})

def Mindmap(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect("http://127.0.0.1:8000/user/user_login/")

    #Retrieve the current logged-in 'user' object
    user_id = request.session['_auth_user_id']
    request_topic = request.GET.get('topic')
    print(request.GET)

    selection_entries = SelectionUsersComments.objects.all().filter(
                        user_id=user_id
                        )
    print(selection_entries)
    return render(request, 'mindmap/mindmaps.html', {'selections':selection_entries,
                                                     })

def ListTopic(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect("http://127.0.0.1:8000/user/user_login/")

    #Retrieve the current logged-in 'user' object
    user_id = request.session['_auth_user_id']
    user = get_object_or_404(User, pk=user_id)

    topics = SelectionUsersComments.objects.all().filter(
                                                  user_id=user_id
                                                  ).values_list(
                                                  'topic', flat=True
                                                  ).distinct(
                                                  )

    return render(request, 'mindmap/topic_list.html', {'topic':topics})
