class UserService {
  constructor() {
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'user_c'
  }

  // Get all users (admin only)
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "email_c" } },
          { field: { Name: "role_c" } },
          { field: { Name: "avatar_c" } },
          { field: { Name: "created_at_c" } }
        ],
        orderBy: [
          {
            fieldName: "created_at_c",
            sorttype: "DESC"
          }
        ]
      }

      const response = await this.apperClient.fetchRecords(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching users:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw error
    }
  }

  // Get user by ID
  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "email_c" } },
          { field: { Name: "role_c" } },
          { field: { Name: "avatar_c" } },
          { field: { Name: "created_at_c" } }
        ]
      }

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params)

      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching user with ID ${id}:`, error.response.data.message)
      } else {
        console.error(error)
      }
      throw error
    }
  }

  // Create user
  async create(userData) {
    try {
      const params = {
        records: [
          {
            Name: userData.Name,
            email_c: userData.email_c,
            password_c: userData.password_c,
            role_c: userData.role_c,
            avatar_c: userData.avatar_c
          }
        ]
      }

      const response = await this.apperClient.createRecord(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)

        if (failedRecords.length > 0) {
          console.error(`Failed to create users ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          throw new Error('Erreur lors de la création de l\'utilisateur')
        }

        return successfulRecords[0]?.data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating user:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw error
    }
  }

  // Update user
  async update(id, userData) {
    try {
      const updateData = {
        Id: parseInt(id)
      }

      if (userData.Name !== undefined) updateData.Name = userData.Name
      if (userData.email_c !== undefined) updateData.email_c = userData.email_c
      if (userData.role_c !== undefined) updateData.role_c = userData.role_c
      if (userData.avatar_c !== undefined) updateData.avatar_c = userData.avatar_c

      const params = {
        records: [updateData]
      }

      const response = await this.apperClient.updateRecord(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)

        if (failedUpdates.length > 0) {
          console.error(`Failed to update users ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          throw new Error('Erreur lors de la mise à jour de l\'utilisateur')
        }

        return successfulUpdates[0]?.data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating user:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw error
    }
  }

  // Delete user
  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      }

      const response = await this.apperClient.deleteRecord(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete users ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          throw new Error('Erreur lors de la suppression de l\'utilisateur')
        }

        return successfulDeletions.length > 0
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting user:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw error
    }
  }
}

// Create and export singleton instance
const userService = new UserService()
export default userService