import type { DataProvider, GetListParams, GetOneParams, CreateParams, UpdateParams, DeleteParams, GetManyParams, GetManyReferenceParams, UpdateManyParams, DeleteManyParams, Identifier } from 'react-admin'
import api from './api'

// Helper function to convert react-admin params to Strapi query params
const convertToStrapiParams = (params: GetListParams) => {
  const { pagination, sort, filter } = params
  
  const query: Record<string, unknown> = {}
  
  // Pagination
  if (pagination) {
    query['pagination[page]'] = pagination.page
    query['pagination[pageSize]'] = pagination.perPage
  }
  
  // Sorting
  if (sort) {
    const order = sort.order === 'ASC' ? 'asc' : 'desc'
    query['sort'] = `${sort.field}:${order}`
  }
  
  // Filtering
  if (filter) {
    Object.keys(filter).forEach(key => {
      if (filter[key] !== '' && filter[key] !== null && filter[key] !== undefined) {
        // For simple string filters, use contains
        if (typeof filter[key] === 'string') {
          query[`filters[${key}][$containsi]`] = filter[key]
        } else {
          query[`filters[${key}][$eq]`] = filter[key]
        }
      }
    })
  }
  
  return query
}

// Data provider implementation
export const strapiProvider: DataProvider = {
  getList: async (resource: string, params: GetListParams) => {
    const query = convertToStrapiParams(params)
    const response = await api.get(`/${resource}`, { params: query })
    
    return {
      data: response.data.data.map((item: { documentId: string; [key: string]: unknown }) => ({
        ...item,
        id: item.documentId, // Map documentId to id for react-admin
      })),
      total: response.data.meta.pagination.total,
    }
  },

  getOne: async (resource: string, params: GetOneParams) => {
    const response = await api.get(`/${resource}/${params.id}`)
    
    return {
      data: {
        ...response.data.data,
        id: response.data.data.documentId,
      },
    }
  },

  getMany: async (resource: string, params: GetManyParams) => {
    // Strapi doesn't have a native getMany, so we'll use filters
    const filters = params.ids.map(id => `filters[documentId][$in][]=${String(id)}`).join('&')
    const response = await api.get(`/${resource}?${filters}`)
    
    return {
      data: response.data.data.map((item: { documentId: string; [key: string]: unknown }) => ({
        ...item,
        id: item.documentId,
      })),
    }
  },

  getManyReference: async (resource: string, params: GetManyReferenceParams) => {
    const { target, id, ...otherParams } = params
    const query = convertToStrapiParams(otherParams)
    query[`filters[${target}][documentId][$eq]`] = String(id)
    
    const response = await api.get(`/${resource}`, { params: query })
    
    return {
      data: response.data.data.map((item: { documentId: string; [key: string]: unknown }) => ({
        ...item,
        id: item.documentId,
      })),
      total: response.data.meta.pagination.total,
    }
  },

  create: async (resource: string, params: CreateParams) => {
    const response = await api.post(`/${resource}`, {
      data: params.data,
    })
    
    return {
      data: {
        ...response.data.data,
        id: response.data.data.documentId,
      },
    }
  },

  update: async (resource: string, params: UpdateParams) => {
    const response = await api.put(`/${resource}/${params.id}`, {
      data: params.data,
    })
    
    return {
      data: {
        ...response.data.data,
        id: response.data.data.documentId,
      },
    }
  },

  updateMany: async (resource: string, params: UpdateManyParams) => {
    // Strapi doesn't support bulk updates, so we'll do them individually
    const promises = params.ids.map((id: Identifier) =>
      api.put(`/${resource}/${String(id)}`, {
        data: params.data,
      })
    )
    
    const responses = await Promise.all(promises)
    
    return {
      data: responses.map(response => response.data.data.documentId),
    }
  },

  delete: async (resource: string, params: DeleteParams) => {
    const response = await api.delete(`/${resource}/${params.id}`)
    
    return {
      data: {
        ...response.data.data,
        id: response.data.data.documentId,
      },
    }
  },

  deleteMany: async (resource: string, params: DeleteManyParams) => {
    // Strapi doesn't support bulk deletes, so we'll do them individually
    const promises = params.ids.map((id: Identifier) =>
      api.delete(`/${resource}/${String(id)}`)
    )
    
    await Promise.all(promises)
    
    return {
      data: params.ids,
    }
  },
}

export default strapiProvider