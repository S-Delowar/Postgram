from django.core.files.storage import default_storage
from django.db.models.signals import pre_save
from django.dispatch import receiver
from core.user.models import User

@receiver(pre_save, sender=User)
def auto_delete_old_avatar_on_change(sender, instance, **kwargs):
    """Delete old avatar when updating to a new one using storage API"""
    if not instance.pk:
        return False
    
    try:
        old_user = User.objects.get(pk=instance.pk)
    except User.DoesNotExist:
        return False
    
    old_avatar = old_user.avatar
    new_avatar = instance.avatar
    
    if old_avatar and old_avatar != new_avatar:
        # Use storage API instead of filesystem operations
        if default_storage.exists(old_avatar.name):
            default_storage.delete(old_avatar.name)