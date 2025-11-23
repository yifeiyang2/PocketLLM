from typing import List, Optional
import json, hashlib


# ===============================
# Token Estimator
# ===============================

def estimate_tokens(text: Optional[str]) -> int:
    """Better multilingual token estimation."""
    if not text:
        return 0
    chinese = sum(1 for c in text if '\u4e00' <= c <= '\u9fff')
    english = len(text.split())
    return chinese * 2 + english


MAX_HISTORY_TOKENS = 1024

def trim_conversation(messages: List, max_tokens: int = MAX_HISTORY_TOKENS):
    total = 0
    trimmed = []
    for msg in reversed(messages):
        tokens = estimate_tokens(msg.content)
        if total + tokens > max_tokens:
            break
        trimmed.insert(0, msg)
        total += tokens
    return trimmed


# ===============================
# System prompt loader
# ===============================

def load_system_prompt(path="prompt.txt") -> str:
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read().strip()
    except:
        return "You are a helpful assistant."


# ===============================
# Chat Formatters
# ===============================

def fmt_chat(role: str, content: str) -> str:
    """Unified <|im_start|> format (works for Qwen/DeepSeek/LLaMA)."""
    return f"<|im_start|>{role}\n{content}<|im_end|>\n"


# ===============================
# Prompt Builder
# ===============================

def build_prompt(messages: List, system_prompt: str, new_user_prompt: str) -> str:
    # system header
    prompt = fmt_chat("system", system_prompt)

    # history
    for msg in messages:
        role = msg.role
        content = (msg.content or "").strip()
        if not content:
            continue
        prompt += fmt_chat(role, content)

    # new user message
    prompt += fmt_chat("user", new_user_prompt.strip())

    # assistant start
    prompt += "<|im_start|>assistant\n"

    return prompt


# ===============================
# Cache Key
# ===============================

def build_cache_key(user_id: str, session_id: str, prompt: str, prev_response: str | None = None) -> str:
    import json
    cache_key = json.dumps({
        "user_id": user_id,
        "session_id": session_id,
        "prompt": prompt.strip(),
        "prev_response": prev_response.strip() if prev_response else None
    }, sort_keys=True)
    return cache_key

