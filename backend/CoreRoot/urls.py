
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from core.routers import urlpatterns as core_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(core_urlpatterns)),
]

urlpatterns += [
    # OpenAPI schema (raw JSON/YAML)
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),

    # Swagger UI
    path('api/schema/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    # Redoc UI
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]