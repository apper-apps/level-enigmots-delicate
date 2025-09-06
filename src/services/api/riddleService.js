class RiddleService {
  constructor() {
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'riddle_c'
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "text_c" } },
          { field: { Name: "answer_c" } },
          { field: { Name: "hints_c" } },
          { field: { Name: "category_c" } }
        ],
        orderBy: [
          {
            fieldName: "Id",
            sorttype: "ASC"
          }
        ]
      }

      const response = await this.apperClient.fetchRecords(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      // Convert hints_c from string to array
      const riddles = (response.data || []).map(riddle => ({
        ...riddle,
        text: riddle.text_c,
        answer: riddle.answer_c,
        hints: riddle.hints_c ? riddle.hints_c.split('\n').filter(hint => hint.trim()) : [],
        category: riddle.category_c
      }))

      return riddles
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching riddles:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw error
    }
  }

  async getById(Id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "text_c" } },
          { field: { Name: "answer_c" } },
          { field: { Name: "hints_c" } },
          { field: { Name: "category_c" } }
        ]
      }

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(Id), params)

      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      const riddle = response.data
      return {
        ...riddle,
        text: riddle.text_c,
        answer: riddle.answer_c,
        hints: riddle.hints_c ? riddle.hints_c.split('\n').filter(hint => hint.trim()) : [],
        category: riddle.category_c
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching riddle with ID ${Id}:`, error.response.data.message)
      } else {
        console.error(error)
      }
      throw error
    }
  }

  async getByCategory(category) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "text_c" } },
          { field: { Name: "answer_c" } },
          { field: { Name: "hints_c" } },
          { field: { Name: "category_c" } }
        ],
        where: [
          {
            FieldName: "category_c",
            Operator: "EqualTo",
            Values: [category]
          }
        ]
      }

      const response = await this.apperClient.fetchRecords(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      const riddles = (response.data || []).map(riddle => ({
        ...riddle,
        text: riddle.text_c,
        answer: riddle.answer_c,
        hints: riddle.hints_c ? riddle.hints_c.split('\n').filter(hint => hint.trim()) : [],
        category: riddle.category_c
      }))

      return riddles
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching riddles by category:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw error
    }
  }

  async getRandom(count = 1) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "text_c" } },
          { field: { Name: "answer_c" } },
          { field: { Name: "hints_c" } },
          { field: { Name: "category_c" } }
        ],
        pagingInfo: {
          limit: count,
          offset: 0
        }
      }

      const response = await this.apperClient.fetchRecords(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      const riddles = (response.data || []).map(riddle => ({
        ...riddle,
        text: riddle.text_c,
        answer: riddle.answer_c,
        hints: riddle.hints_c ? riddle.hints_c.split('\n').filter(hint => hint.trim()) : [],
        category: riddle.category_c
      }))

      // Shuffle array
      return riddles.sort(() => 0.5 - Math.random())
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching random riddles:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw error
    }
  }

  async create(riddleData) {
    try {
      const params = {
        records: [
          {
            Name: riddleData.Name || `Énigme ${Date.now()}`,
            text_c: riddleData.text_c,
            answer_c: riddleData.answer_c,
            hints_c: Array.isArray(riddleData.hints_c) ? riddleData.hints_c.join('\n') : riddleData.hints_c,
            category_c: riddleData.category_c
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
          console.error(`Failed to create riddles ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          throw new Error('Erreur lors de la création de l\'énigme')
        }

        return successfulRecords[0]?.data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating riddle:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw error
    }
  }

  async update(Id, data) {
    try {
      const updateData = {
        Id: parseInt(Id)
      }

      if (data.Name !== undefined) updateData.Name = data.Name
      if (data.text_c !== undefined) updateData.text_c = data.text_c
      if (data.answer_c !== undefined) updateData.answer_c = data.answer_c
      if (data.hints_c !== undefined) updateData.hints_c = Array.isArray(data.hints_c) ? data.hints_c.join('\n') : data.hints_c
      if (data.category_c !== undefined) updateData.category_c = data.category_c

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
          console.error(`Failed to update riddles ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          throw new Error('Erreur lors de la mise à jour de l\'énigme')
        }

        return successfulUpdates[0]?.data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating riddle:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw error
    }
  }

  async delete(Id) {
    try {
      const params = {
        RecordIds: [parseInt(Id)]
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
          console.error(`Failed to delete riddles ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          throw new Error('Erreur lors de la suppression de l\'énigme')
        }

        return successfulDeletions.length > 0
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting riddle:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw error
    }
  }
}

// Create and export singleton instance
export const riddleService = new RiddleService()