import { mockApi } from './mock-api';

const api = {
  auth: {
    login: async (email: string, password: string) => {
      try {
        const response = await mockApi.auth.login(email, password);
        return response;
      } catch (error) {
        console.error('Login error:', error);
        throw new Error('Invalid credentials');
      }
    },
    register: async (name: string, email: string, password: string) => {
      try {
        const response = await mockApi.auth.register(name, email, password);
        return response;
      } catch (error) {
        console.error('Registration error:', error);
        throw new Error('Registration failed');
      }
    }
  },
  courses: {
    getAll: async () => {
      try {
        return await mockApi.courses.getAll();
      } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
      }
    },
    getById: async (id: string) => {
      try {
        return await mockApi.courses.getById(id);
      } catch (error) {
        console.error('Error fetching course:', error);
        throw error;
      }
    },
    create: async (data: any) => {
      try {
        return await mockApi.courses.create(data);
      } catch (error) {
        console.error('Error creating course:', error);
        throw error;
      }
    },
    update: async (id: string, data: any) => {
      try {
        return await mockApi.courses.update(id, data);
      } catch (error) {
        console.error('Error updating course:', error);
        throw error;
      }
    }
  }
};

export default api;