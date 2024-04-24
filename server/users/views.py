from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import update_last_login

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    """
    API view for changing user password.
    """
    user = request.user
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')
    
    if not user.check_password(current_password):
        return Response({"error": "Current password is incorrect."}, status=400)
    
    user.set_password(new_password)
    user.save()
    
    update_last_login(None, user)
    
    return Response({"success": "Password changed successfully."}, status=200)
