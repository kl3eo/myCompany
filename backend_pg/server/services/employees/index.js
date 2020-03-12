module.exports = {
  onUpdateSuccess: {
    success: true,
    message: 'Профиль успешно обновлен'
  },
  onClientAdminFail: {
    success: false,
    message: 'Пользователь Не является админом'
  },
  onServerAdminFail: {
    success: false,
    message: 'Эта часть программы доступна только админам'
  },
  onSetVacationSuccess: {
    success: true,
    message: 'Your vacations set successfully.'
  },
  onVacationExist: {
    success: false,
    message: 'You already setup vacation on this date'
  },
  onVacationDelete: {
    success: true,
    message: 'Vacation is deleted successfully.'
  }
};
