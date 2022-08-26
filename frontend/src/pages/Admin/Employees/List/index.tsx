import './styles.css';

import Pagination from 'components/Pagination';
import EmployeeCard from 'components/EmployeeCard';
import { Link } from 'react-router-dom';
import { Employee } from 'types/employee';
import { SpringPage } from 'types/vendor/spring';
import { useCallback, useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { hasAnyRoles} from 'util/auth';

type PageInformation = {
  activePage: number;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<Employee>>();

  const [pageInformation, setPageInformation] =
    useState<PageInformation>({
      activePage: 0,
    });

  const getEmployees = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/employees',
      withCredentials: true,
      params: {
        page: pageInformation.activePage,
        size: 4
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [pageInformation]);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);


  const handlePageChange = (pageNumber: number) => {
    setPageInformation({ activePage: pageNumber });
  };

  return (
    <>
      {hasAnyRoles(['ROLE_ADMIN']) &&
        <Link to="/admin/employees/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
      }

      {page?.content.map((employee) => (
        <EmployeeCard employee={employee} key={employee.id}/>
      ))}

      <Pagination
        forcePage={page?.number}
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange}
      />
    </>
  );
};

export default List;
