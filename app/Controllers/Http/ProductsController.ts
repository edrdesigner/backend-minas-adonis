import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';

export default class ProductsController {
  public async index({ request }: HttpContextContract) {
    const { page, search, limit = 16 } = request.get()

    const query = Product
      .query()
      .preload('images')

    if (search) {
      const searchValue = search.toLowerCase().trim()
      query.whereRaw(`
        (
          lower(title) like '%${searchValue}%' OR
          lower(description) like '%${searchValue}%'
        )`
      )
    }

    const products = await query.paginate(page, limit)

    return products;
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['title', 'description', 'price', 'discount'])
    const images = request.input('images')

    const product = await Product.create(data)

    if (images && images.length > 0) {
      product.related('images').createMany(images)
    }

    return product
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params

    const product = await Product.findOrFail(id)
    await product.delete()
  }
}
