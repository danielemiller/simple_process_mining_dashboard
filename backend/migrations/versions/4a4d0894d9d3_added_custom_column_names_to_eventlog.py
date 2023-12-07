"""Added custom column names to EventLog

Revision ID: 4a4d0894d9d3
Revises: 4e355244a3f4
Create Date: 2023-12-07 10:15:57.200362

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4a4d0894d9d3'
down_revision = '4e355244a3f4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('event_log', schema=None) as batch_op:
        batch_op.add_column(sa.Column('activity_column', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('timestamp_column', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('case_key_column', sa.String(length=100), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('event_log', schema=None) as batch_op:
        batch_op.drop_column('case_key_column')
        batch_op.drop_column('timestamp_column')
        batch_op.drop_column('activity_column')

    # ### end Alembic commands ###
