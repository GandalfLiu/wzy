

# Create your views here.
import hashlib
import uuid

from django.shortcuts import render, redirect

from App.models import User

# 首页
def index(request):
    token = request.session.get('token')
    print(token,'**********8')
    if not token:
        name = None
    else:
        user = User.objects.filter(token=token).first()
        name = user.phone
    data = {}
    data['name'] = name
    return render(request,'index.html',data)


def goodinfo(request):
    return render(request,'goodinfo.html')


def goodlist(request):
    return render(request,'goodlist.html')


def goodsinfo(request):
    return render(request,'goodsinfo.html')

# 登录
def login(request):
    if request.method == 'GET':
        return render(request,'login.html')
    elif request.method == 'POST':
        phone = request.POST.get('phone')
        password = request.POST.get('password')
        password = secret(password)
        try:
            users = User.objects.filter(phone=phone).filter(password=password)
            print(users)
            user = users.first()
            user.token = str(uuid.uuid5(uuid.uuid4(),'login'))
            user.save()
            request.session['token'] = user.token
            return redirect('dr:index')
        except:
            return redirect('dr:login')

# 注册
def register(request):
    if request.method == 'GET':
        return render(request,'register.html')
    elif request.method == "POST":
        phone = request.POST.get('phone')
        password = request.POST.get('password')
        password = secret(password)
        user = User()
        user.phone = phone
        user.password = password
        user.token = str(uuid.uuid5(uuid.uuid4(),'register'))
        user.save()
        request.session['token'] = user.token
        return redirect('dr:index')


def shopcar(request):
    return render(request,'shopcar.html')


# md5加密
def secret(password):
    md5 = hashlib.md5()
    md5.update(password.encode('utf-8'))
    return md5.hexdigest()


# 退出
def logout(request):
    request.session.flush()
    return redirect('dr:index')