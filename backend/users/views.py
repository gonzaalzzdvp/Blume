from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

from .serializers import RegisterSerializer, LoginSerializer


class RegisterView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(
            {
                "message": "Usuario creado correctamente."
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = LoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        access = str(refresh.access_token)

        response = Response({
            "message": "Login exitoso."
        })

        response.set_cookie(
            key="access_token",
            value=access,
            httponly=True,
            samesite = "None",
            secure = True,
            path="/",
            max_age=60 * 15,
        )

        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            samesite = "None",
            secure = True,
            max_age=60 * 60 * 24 * 7,
        )

        return response


class LogoutView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        refresh_token = request.COOKIES.get("refresh_token")

        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception:
                pass

        response = Response({
            "message": "Sesión cerrada."
        })

        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")

        return response


class MeView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        return Response({
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "avatar": user.avatar,
            "role": user.role,
        })
    
class RefreshView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:

            return Response(
                {
                    "detail": "No refresh token."
                },
                status=401,
            )

        try:

            refresh = RefreshToken(refresh_token)

            access = str(refresh.access_token)

            response = Response({
                "message": "Token actualizado."
            })

            response.set_cookie(
                key="access_token",
                value=access,
                httponly=True,
                samesite = "None",
                secure = True,
                path="/",
                max_age=60 * 15,
            )

            return response

        except Exception:

            return Response(
                {
                    "detail": "Refresh token inválido."
                },
                status=401,
            )