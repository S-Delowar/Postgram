from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from core.utils.openai_utils import summarize_text, check_toxicity

class AIUtilityViewSet(ViewSet):

    @action(detail=False, methods=['post'])
    def summarize(self, request):
        text = request.data.get("text")
        if not text:
            return Response({"error": "Missing text"}, status=status.HTTP_400_BAD_REQUEST)
        summary = summarize_text(text)
        return Response({"summary": summary})

    @action(detail=False, methods=['post'])
    def toxicity(self, request):
        text = request.data.get("text")
        if not text:
            return Response({"error": "Missing text"}, status=status.HTTP_400_BAD_REQUEST)
        result = check_toxicity(text)
        return Response(result)
