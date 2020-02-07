module.exports = {
  /**
   * OnDelete e onUpdate -> o que irá acontecer com o usuário (avatar_id) se o arquivo
   * excluído ou alterado na tabela files.
   */
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      reference: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
