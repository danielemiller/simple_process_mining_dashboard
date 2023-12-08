"""Add Article model

Revision ID: 484ad46d281e
Revises: 4a4d0894d9d3
Create Date: 2023-12-07 16:49:42.799664

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '484ad46d281e'
down_revision = '4a4d0894d9d3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('article',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('article')
    # ### end Alembic commands ###
