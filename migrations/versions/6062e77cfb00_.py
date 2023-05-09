"""empty message

Revision ID: 6062e77cfb00
Revises: 
Create Date: 2023-05-08 20:53:30.213937

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6062e77cfb00'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bike',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('link', sa.String(), nullable=False),
    sa.Column('terrain', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bike_part',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('part', sa.String(), nullable=False),
    sa.Column('terrain', sa.String(), nullable=False),
    sa.Column('size', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('link', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('lastname', sa.String(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('size', sa.String(), nullable=False),
    sa.Column('weight', sa.String(), nullable=False),
    sa.Column('bike_type', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('favorites_parts',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('bike_part_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['bike_part_id'], ['bike_part.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'bike_part_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('favorites_parts')
    op.drop_table('user')
    op.drop_table('bike_part')
    op.drop_table('bike')
    # ### end Alembic commands ###
