import React from 'react';
import Button from '../../commons/buttons/button';

import './add.css';

const AddEmployeeView = (props) => (
  <div className='new'>
    <div className={(props.success) ? 'message success' : 'message error'}>{props.message}</div>
    <form onSubmit={props.handleAddEmployee}>
      <div>
        <label>Ф.И.О.</label>
        <input type="text" name="name" className="fields" value={props.name} onChange={props.handleChange} />
      </div>
      <div>
        <label>Должность</label>
        <input type="text" name="position" className="fields" value={props.position} onChange={props.handleChange} />
      </div>
      <div>
        <label>Логин</label>
        <input type="text" name="username" className="fields" value={props.username} onChange={props.handleChange} />
      </div>
      <div>
        <label>Пароль</label>
        <input type="password" name="password" className="fields" value={props.password} onChange={props.handleChange} />
      </div>
      <div>
        <label>E-mail</label>
        <input type="email" name="email" className="fields" value={props.email} onChange={props.handleChange} />
      </div>
      <div>
        <label>Роль</label>
        <select className="dropdown" name="role"  value={props.role} onChange={props.handleChange}>
          <option>Выбрать</option>
          <option value="Client">Пользователь</option>
          <option value="Admin">Админ</option>
        </select>
      </div>
      <div>
      <label>Фото</label>
             <input name="profileImg" type="file" onChange={props.onFileChange} />
      </div>
      <div>
        <span className='required'>Все поля нужны.</span>
        <Button classes='btn success' buttonLabel='Сохранить' />
      </div>
    </form>
  </div>
);

export default AddEmployeeView;
