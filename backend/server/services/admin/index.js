module.exports = {
  clientAdminFailed: {
    success: false,
    message: 'Tried to access admin area from the client.'
  },
  onServerAdminFail: {
    success: false,
    message: 'This is for admin users only'
  },
  employeeAddedSuccessfully: {
    success: true,
    message: 'Профиль успешно добавлен'
  },
  onProfileUpdateSuccess: {
    success: true,
    message: 'Профиль успешно обновлен'
  },
  onProfileUpdatePasswordEmpty: {
    success: false,
    message: 'Пожалуйста введите пароль'
  },
  onProfileUpdateUsernameEmpty: {
    success: false,
    message: 'Пожалуйста введите логин'
  },
  onProfileUpdatePasswordUserEmpty: {
    success: false,
    message: 'Введите логин и старый или новый пароль'
  }
}
