import React from 'react';
//import { getCookie } from '../../../utils/cookies';
import Button from '../../commons/buttons/button';

const EmployeeDetailsUpdateView = (props) => (
  <div className='update'>
    <form onSubmit={props.handleUpdateEmployee}>
      <div className={(!props.success) ? 'message error' : 'message success'}>{props.message}</div>
      <div>
        <label>Ф.И.О.</label>
        <input type="text" name="name" defaultValue={props.employee.name} className="fields uppercase" />
      </div>
      <div>
        <label>E-mail</label>
        <input type="email" name="email" defaultValue={props.employee.email} className="fields" />
      </div>
      <div>
        <label>Должность</label>
        <input type="text" name="position" defaultValue={props.employee.position} className="fields uppercase" />
      </div>
      <div>
        <label>Логин</label>
        <input type="text" name="username" defaultValue={props.employee.username} className="fields" />
      </div>
      <div>
        <label>Пароль</label>
        <input type="password" name="password" className="fields" placeholder="Введите старый или новый пароль (не обязательно)" />
      </div>
      <div>
        <label>Роль</label>
        {(props.role === 'Admin')
          ?
          <select name="role" className="dropdown" defaultValue={props.employee.role}>
            <option>Выбрать</option>
            <option value="Client">Пользователь</option>
            <option value="Admin">Админ</option>
          </select>
          :
          <input type="text" name="role" readOnly value={props.employee.role} className="fields" />
        }
      </div>
      <div>
      <label>Фото</label>
             <input name="profileimg" type="file" onChange={props.onFileChange} />{props.employee.profileimg}
      </div>      
      <div>
        <Button classes='btn success' buttonLabel='Сохранить' />
      </div>
    </form>
  </div>
);

export default EmployeeDetailsUpdateView;
