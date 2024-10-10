import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../api/api';
import { Select, Typography, Pagination, Layout, Button } from 'antd';
import Logout from './Logout'; 
const { Header, Content } = Layout;
import { useAuth } from '../context/AuthContext';

const { Option } = Select;
const { Title } = Typography;

const sortOptions = [
  { value: 'recent', label: 'Recent Projects' },
  { value: 'category', label: 'Order By Category Name ASC' },
  { value: 'username', label: 'Order By Username ASC' },
  { value: 'title', label: 'Order By Project Title ASC' },
];

const limitOptions = [2, 5, 10];

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(2);
  const [sortBy, setSortBy] = useState<string>('recent');
  const { username  } = useAuth(); 
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects(sortBy, currentPage, limit);
        setProjects(data.projects || []);
        setTotalProjects(data.totalPages || 0);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    loadProjects();
  }, [sortBy, currentPage, limit]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
    setCurrentPage(1);
  };

  return (
    <Layout className="container">
      <Header className="header">
        <div className="d-flex justify-content-between pt-3 align-items-center">
          <Title level={2} style={{ color: 'white', margin: 0 }}>
            Projects
          </Title>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography.Text style={{ color: 'white', marginRight: '16px' }}>
              Welcome, {username}!
            </Typography.Text>
            <Logout />
          </div>
        </div>
      </Header>
      <Content className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Select
            defaultValue={limit}
            onChange={handleLimitChange}
            className="limitSelect"
          >
            {limitOptions.map(option => (
              <Option key={option} value={option}>
                {option} per page
              </Option>
            ))}
          </Select>

          <Select
            defaultValue={sortOptions[0].value}
            onChange={handleSortChange}
            className="selectSortBy ms-2 limitSelect"
          >
            {sortOptions.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>

        <div className="row">
          {projects.map((project, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card">
                <div className="card-body">
                  <p className="card-text"><b>Project Title:</b> {project.project_title}</p>
                  <p className="card-text"><b>User Name:</b> {project.username}</p>
                  <p className="card-text"><b>Category:</b> {project.category_name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          current={currentPage}
          total={totalProjects * limit}
          pageSize={limit}
          onChange={setCurrentPage}
        />
      </Content>
    </Layout>
  );
};

export default ProjectList;
