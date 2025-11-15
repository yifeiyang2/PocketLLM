"""
SQLAlchemy ORM models for PocketLLM database.

Architecture Reference: HW3 Section 3.2 - Database Schema
- User model for authentication
- Session model for chat sessions
- Message model for chat messages
"""
from sqlalchemy import Column, String, Boolean, Integer, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base


class User(Base):
    """
    User model for authentication and authorization.

    Attributes:
        user_id: Primary key (UUID)
        username: Unique username for login
        password_hash: Bcrypt hashed password
        is_admin: Admin privilege flag
        created_at: Account creation timestamp
    """
    __tablename__ = "users"

    user_id = Column(String(36), primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    sessions = relationship("Session", back_populates="user", cascade="all, delete-orphan")
    messages = relationship("Message", back_populates="user", cascade="all, delete-orphan")


class Session(Base):
    """
    Chat session model for organizing conversations.

    Attributes:
        session_id: Primary key (UUID)
        user_id: Foreign key to User
        created_at: Session creation timestamp
        updated_at: Last message timestamp
    """
    __tablename__ = "sessions"

    session_id = Column(String(36), primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.user_id"), nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    user = relationship("User", back_populates="sessions")
    messages = relationship("Message", back_populates="session", cascade="all, delete-orphan", order_by="Message.timestamp")


class Message(Base):
    """
    Chat message model for storing conversation history.

    Attributes:
        message_id: Primary key (UUID)
        session_id: Foreign key to Session
        user_id: Foreign key to User
        role: Message role ('user' or 'assistant')
        content: Message text content
        timestamp: Message creation timestamp
        tokens_used: Number of tokens used (for assistant messages)
    """
    __tablename__ = "messages"

    message_id = Column(String(36), primary_key=True, index=True)
    session_id = Column(String(36), ForeignKey("sessions.session_id"), nullable=False, index=True)
    user_id = Column(String(36), ForeignKey("users.user_id"), nullable=False, index=True)
    role = Column(String(20), nullable=False)  # 'user' or 'assistant'
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    tokens_used = Column(Integer, nullable=True)

    # Relationships
    session = relationship("Session", back_populates="messages")
    user = relationship("User", back_populates="messages")
