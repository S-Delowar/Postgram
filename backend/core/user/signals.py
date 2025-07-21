import os
from django.db.models.signals import pre_save
from django.dispatch import receiver

from core.user.models import User



@receiver(pre_save, sender=User)
def auto_delete_old_avatar_on_change(sender, instance, **kwargs):
    if not instance.id:
        # new user, no old file. so do nothing
        return 
    
    try:
        old_avatar = User.objects.get(id=instance.id).avatar
    except User.DoesNotExist:
        return
    
    new_avatar = instance.avatar
    
    if old_avatar and old_avatar != new_avatar:
        old_avatar_path = old_avatar.path
        if os.path.isfile(old_avatar_path):
            os.remove(old_avatar_path)