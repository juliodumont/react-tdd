import history from 'util/history';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import './styles.css';
import { Department } from 'types/department';
import { Employee } from 'types/employee';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';


const Form = () => {
  const [selectDepartments, setSelectDepartments] = useState<Department[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Employee>();

  const handleCancel = () => {
    history.push('/admin/employees')
  };

  const onSubmit = (EmployeeData: Employee) => {
    const data = {
      name: EmployeeData.name,
      email: EmployeeData.email,
      department: { id: EmployeeData.department.id }
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/employees',
      data,
      withCredentials: true
    }
    requestBackend(config).then(() => {
      toast.info('Cadastrado com sucesso');
      history.push('/admin/employees')
    }).catch(() => {
      toast.error('Erro ao cadastrar');
    })
  };

  useEffect(() => {
    requestBackend({ url: '/departments', withCredentials: true }).then((response) => {
      setSelectDepartments(response.data)
    })
  }, [])

  return (
    <div className="employee-crud-container">
      <div className="base-card employee-crud-form-card">
        <h1 className="employee-crud-form-title">INFORME OS DADOS</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row employee-crud-inputs-container">
            <div className="col employee-crud-inputs-left-container">

              <div className="margin-bottom-30">
                <input type="text"
                  placeholder='Nome do funcionário'
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  data-testid='name'
                  className={`form-control base-input ${!errors.name ? '' : 'is-invalid'}`}
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <input type="text"
                  placeholder='Email do funcionário'
                  {...register('email', {
                    required: 'Campo obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  })}
                  data-testid='email'
                  className={`form-control base-input ${!errors.email ? '' : 'is-invalid'}`}
                />
                <div className="invalid-feedback d-block">
                  {errors.email?.message}
                </div>
              </div>

              <div className="margin-bottom-30 ">
              <label htmlFor="department" className='d-name'>Departamento</label>
                <Controller
                  name="department"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      placeholder='Departamento'
                      {...field}
                      options={selectDepartments}
                      classNamePrefix="employee-crud-select"
                      isMulti
                      getOptionLabel={(department: Department) => department.name}
                      getOptionValue={(department: Department) =>
                        String(department.id)
                      }
                      inputId="department"
                    />
                  )}
                />
                {errors.department && (
                  <div className="invalid-feedback d-block">
                    Campo obrigatório
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="employee-crud-buttons-container">
            <button
              className="btn btn-outline-danger employee-crud-button"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary employee-crud-button text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
