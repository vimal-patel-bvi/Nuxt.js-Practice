<template>
    <div class="login-container">
      <div class="login-card">
        <h1 class="login-title">Login</h1>
        
        <form @submit.prevent="handleSubmit" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              @blur="validateField('email')"
              :class="{ 'is-invalid': errors.email }"
            />
            <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              @blur="validateField('password')"
              :class="{ 'is-invalid': errors.password }"
            />
            <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
          </div>
          
          <button type="submit" class="login-button" :disabled="isSubmitting">
            {{ isSubmitting ? 'Logging in...' : 'Login' }}
          </button>
          
          <div v-if="submitError" class="submit-error">{{ submitError }}</div>
        </form>
        
        <div class="login-footer">
          <p>Don't have an account? <router-link to="/register">Register</router-link></p>
          <p><router-link to="/forgot-password">Forgot password?</router-link></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        errors: {
          email: '',
          password: ''
        },
        isSubmitting: false,
        submitError: ''
      }
    },
    methods: {
      validateField(field) {
        if (field === 'email') {
          if (!this.form.email) {
            this.errors.email = 'Email is required';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
            this.errors.email = 'Please enter a valid email address';
          } else {
            this.errors.email = '';
          }
        }
        
        if (field === 'password') {
          if (!this.form.password) {
            this.errors.password = 'Password is required';
          } else if (this.form.password.length < 6) {
            this.errors.password = 'Password must be at least 6 characters';
          } else {
            this.errors.password = '';
          }
        }
      },
      validateForm() {
        this.validateField('email');
        this.validateField('password');
        
        return !this.errors.email && !this.errors.password;
      },
      async handleSubmit() {
        if (!this.validateForm()) {
          return;
        }
        
        this.isSubmitting = true;
        this.submitError = '';
        
        try {
          // Replace with your actual login API call
          // await login(this.form.email, this.form.password);
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // On successful login, redirect or perform other actions
          this.$router.push('/dashboard');
        } catch (error) {
          this.submitError = error.message || 'Login failed. Please try again.';
        } finally {
          this.isSubmitting = false;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
  }
  
  .login-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  
  .login-title {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  label {
    font-weight: 500;
    color: #555;
  }
  
  input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  input.is-invalid {
    border-color: #dc3545;
  }
  
  .invalid-feedback {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
  
  .login-button {
    padding: 0.75rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.3s;
  }
  
  .login-button:hover {
    background-color: #45a049;
  }
  
  .login-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .submit-error {
    color: #dc3545;
    text-align: center;
    margin-top: 1rem;
  }
  
  .login-footer {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.9rem;
    color: #666;
  }
  
  .login-footer a {
    color: #4CAF50;
    text-decoration: none;
  }
  
  .login-footer a:hover {
    text-decoration: underline;
  }
  </style>