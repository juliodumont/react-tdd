import history from 'util/history';
import { useForm } from 'react-hook-form';
import './styles.css';


type EmployeeInfo = {
  name: string;
  email: string;
}

const Form = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EmployeeInfo>();

  const handleCancel = () => {
    history.push('/admin/employees')
  };

  const onSubmit = (EmployeeData: EmployeeInfo) => {
    console.log(EmployeeData);
  };

  return (
    <div className="employee-crud-container">
      <div className="base-card employee-crud-form-card">
        <h1 className="employee-crud-form-title">INFORME OS DADOS</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row employee-crud-inputs-container">
            <div className="col employee-crud-inputs-left-container">

              <div className="margin-bottom-30">
                <input type="text"
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  className={`form-control base-input ${!errors.name ? '' : 'is-invalid'}`}
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <input type="text"
                  {...register('email', {
                    required: 'Campo obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  })}
                  className={`form-control base-input ${!errors.email ? '' : 'is-invalid'}`}
                />
                <div className="invalid-feedback d-block">
                  {errors.email?.message}
                </div>
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
