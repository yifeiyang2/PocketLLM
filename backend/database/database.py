"""
Database configuration and initialization for PocketLLM.

Architecture Reference: HW3 Section 3.2 - Database Layer
- SQLAlchemy ORM for SQLite
- Session management
- Database initialization
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import settings

# SQLite database URL
DATABASE_URL = getattr(settings, 'DATABASE_URL', 'sqlite:///./pocketllm.db')

# Create SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith('sqlite') else {},
    echo=settings.DEBUG  # Log SQL queries in debug mode
)

# Create SessionLocal class for database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class for declarative models
Base = declarative_base()


def init_db():
    """
    Initialize database by creating all tables.
    Called on application startup.
    """
    from .models import User, Session, Message  # Import models to register them
    Base.metadata.create_all(bind=engine)


def get_db():
    """
    Dependency function to get database session.
    Yields session and ensures it's closed after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
