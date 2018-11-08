from django.conf.urls import url

from App import views

urlpatterns = [
    url(r'^$', views.index,name='index'),
    url(r'^goodinfo/$', views.goodinfo,name='goodinfo'),
    url(r'^goodlist/$', views.goodlist,name='goodlist'),
    url(r'^goodsinfo/$', views.goodsinfo,name='goodsinfo'),
    url(r'^login/$', views.login,name='login'),
    url(r'^register/$',views.register,name='register'),
    url(r'^shopcar/$',views.shopcar,name='shopcar'),
    url(r'^logout/$',views.logout,name='logout'),

]