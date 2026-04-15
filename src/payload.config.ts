import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'admins',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    suppressHydrationWarning: true,
  },
  collections: [
    {
      slug: 'admins',
      auth: {
        tokenExpiration: 7200,
        verify: false,
        maxLoginAttempts: 5,
        lockTime: 600 * 1000,
      },
      admin: {
        useAsTitle: 'email',
      },
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'roles',
          type: 'select',
          defaultValue: 'admin',
          options: [
            { label: 'Admin', value: 'admin' },
          ],
        },
      ],
    },
    {
      slug: 'users',
      auth: false,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'clerkId',
          type: 'text',
          required: true,
          unique: true,
          index: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          unique: true,
        },
        {
          name: 'firstName',
          type: 'text',
        },
        {
          name: 'lastName',
          type: 'text',
        },
        {
          name: 'imageUrl',
          type: 'text',
        },
        // Billing Address
        {
          name: 'billingAttentionTo',
          type: 'text',
        },
        {
          name: 'billingMailStop',
          type: 'text',
        },
        {
          name: 'billingPhone',
          type: 'text',
        },
        {
          name: 'billingEmail',
          type: 'email',
        },
        {
          name: 'billingAddress1',
          type: 'text',
        },
        {
          name: 'billingAddress2',
          type: 'text',
        },
        {
          name: 'billingCountry',
          type: 'text',
        },
        {
          name: 'billingState',
          type: 'text',
        },
        {
          name: 'billingCity',
          type: 'text',
        },
        {
          name: 'billingPincode',
          type: 'text',
        },
        {
          name: 'billingGstin',
          type: 'text',
        },
        {
          name: 'billingCompanyName',
          type: 'text',
        },
        // Shipping Address
        {
          name: 'shippingAttentionTo',
          type: 'text',
        },
        {
          name: 'shippingMailStop',
          type: 'text',
        },
        {
          name: 'shippingPhone',
          type: 'text',
        },
        {
          name: 'shippingEmail',
          type: 'email',
        },
        {
          name: 'shippingAddress1',
          type: 'text',
        },
        {
          name: 'shippingAddress2',
          type: 'text',
        },
        {
          name: 'shippingCountry',
          type: 'text',
        },
        {
          name: 'shippingState',
          type: 'text',
        },
        {
          name: 'shippingCity',
          type: 'text',
        },
        {
          name: 'shippingPincode',
          type: 'text',
        },
        {
          name: 'shippingGstin',
          type: 'text',
        },
        {
          name: 'shippingCompanyName',
          type: 'text',
        },
      ],
    },
    {
      slug: 'media',
      access: {
        read: () => true,
        create: ({ req }) => Boolean(req.user),
        update: ({ req }) => Boolean(req.user),
        delete: ({ req }) => Boolean(req.user),
      },
      upload: {
        staticDir: path.resolve(dirname, '../public/media'),
        adminThumbnail: 'thumbnail',
        imageSizes: [
          {
            name: 'thumbnail',
            width: 400,
            height: 300,
            position: 'centre',
          },
        ],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      slug: 'orders',
      admin: {
        useAsTitle: 'projectName',
        defaultColumns: ['projectName', 'user', 'status', 'total', 'createdAt'],
      },
      fields: [
        {
          name: 'projectName',
          type: 'text',
          required: true,
        },
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Pending Payment', value: 'pending_payment' },
            { label: 'Payment Success', value: 'payment_success' },
            { label: 'Payment Failed', value: 'payment_failed' },
            { label: 'CAM Validation', value: 'cam_validation' },
            { label: 'In Production', value: 'production' },
            { label: 'Quality Control', value: 'qc' },
            { label: 'Shipped', value: 'shipped' },
            { label: 'Delivered', value: 'delivered' },
          ],
          defaultValue: 'pending_payment',
        },
        {
          name: 'total',
          type: 'number',
          required: true,
        },
        {
          name: 'razorpayOrderId',
          type: 'text',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'productId', type: 'text' },
            { name: 'name', type: 'text' },
            { name: 'quantity', type: 'number' },
            { name: 'price', type: 'number' },
            { name: 'image', type: 'text' },
          ],
        },
        {
          name: 'shippingAddress',
          type: 'group',
          fields: [
            { name: 'name', type: 'text' },
            { name: 'address1', type: 'text' },
            { name: 'address2', type: 'text' },
            { name: 'city', type: 'text' },
            { name: 'state', type: 'text' },
            { name: 'pincode', type: 'text' },
            { name: 'email', type: 'text' },
            { name: 'phone', type: 'text' },
          ],
        },
        {
          name: 'billingAddress',
          type: 'group',
          fields: [
            { name: 'name', type: 'text' },
            { name: 'address1', type: 'text' },
            { name: 'address2', type: 'text' },
            { name: 'city', type: 'text' },
            { name: 'state', type: 'text' },
            { name: 'pincode', type: 'text' },
            { name: 'email', type: 'text' },
            { name: 'phone', type: 'text' },
          ],
        },
        {
          name: 'specs',
          type: 'group',
          fields: [
            { name: 'width', type: 'number' },
            { name: 'height', type: 'number' },
            { name: 'layers', type: 'number' },
            { name: 'quantity', type: 'number' },
            { name: 'color', type: 'text' },
          ],
        },
        {
          name: 'gerberFile',
          type: 'relationship',
          relationTo: 'media',
        },
        {
          name: 'shipmentTitle',
          type: 'ui',
          admin: {
            position: 'sidebar',
            components: {
               Field: '@/components/admin/ShipmentButtons#ShipmentButtons',
            }
          }
        },
        {
          name: 'payment',
          type: 'relationship',
          relationTo: 'payments',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'deliveryMethod',
          type: 'select',
          options: [
            { label: 'Shiprocket', value: 'shiprocket' },
            { label: 'Custom Delivery', value: 'custom' },
          ],
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'deliveryStatus',
          type: 'select',
          options: [
            { label: 'Not Dispatched', value: 'not_dispatched' },
            { label: 'Ready to Ship', value: 'ready_to_ship' },
            { label: 'Picked Up', value: 'picked_up' },
            { label: 'In Transit', value: 'in_transit' },
            { label: 'Out for Delivery', value: 'out_for_delivery' },
            { label: 'Delivered', value: 'delivered' },
            { label: 'Cancelled', value: 'cancelled' },
          ],
          defaultValue: 'not_dispatched',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'trackingNumber',
          type: 'text',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'courierName',
          type: 'text',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'shiprocketOrderId',
          type: 'text',
          admin: {
            position: 'sidebar',
          },
        },
      ],
    },
    {
      slug: 'payments',
      admin: {
        useAsTitle: 'razorpayPaymentId',
        defaultColumns: ['razorpayPaymentId', 'amount', 'status', 'createdAt'],
      },
      fields: [
        {
          name: 'razorpayPaymentId',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'razorpayOrderId',
          type: 'text',
          required: true,
        },
        {
          name: 'amount',
          type: 'number',
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Success', value: 'success' },
            { label: 'Failed', value: 'failed' },
            { label: 'Pending', value: 'pending' },
          ],
          defaultValue: 'pending',
        },
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          required: true,
        },
        {
          name: 'order',
          type: 'relationship',
          relationTo: 'orders',
          required: true,
        },
      ],
    },
    {
      slug: 'categories',
      access: {
        read: () => true,
        create: ({ req }) => Boolean(req.user),
        update: ({ req }) => Boolean(req.user),
        delete: ({ req }) => Boolean(req.user),
      },
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'count',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
    {
      slug: 'products',
      admin: {
        useAsTitle: 'name',
      },
      access: {
        read: () => true,
        create: ({ req }) => Boolean(req.user),
        update: ({ req }) => Boolean(req.user),
        delete: ({ req }) => Boolean(req.user),
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'brand',
          type: 'text',
          required: true,
        },
        {
          name: 'manufacturer',
          type: 'text',
          required: false,
        },
        {
          name: 'mpn',
          type: 'text',
          required: false,
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'basePartNumber',
          type: 'text',
        },
        {
          name: 'stock',
          type: 'number',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'rating',
          type: 'number',
          defaultValue: 5,
        },
        {
          name: 'pricingTiers',
          type: 'array',
          fields: [
            {
              name: 'qty',
              type: 'number',
              required: true,
            },
            {
              name: 'unitPrice',
              type: 'number',
              required: true,
            },
            {
              name: 'extPrice',
              type: 'number',
            },
          ],
        },
        {
          name: 'specs',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'pcbDetails',
          type: 'group',
          admin: {
            condition: (data) => data.category && String(data.category) !== '', // Condition can be stricter if needed
            description: 'Specific details for PCB fabrication products (optional)',
          },
          fields: [
            { name: 'boardType', type: 'select', options: [{ label: 'Rigid', value: 'rigid'}, { label: 'Flex', value: 'flex'}, { label: 'Rigid-Flex', value: 'rigid-flex' }] },
            { name: 'layers', type: 'number' },
            { name: 'material', type: 'text' },
            { name: 'thickness', type: 'text' },
            { name: 'copperWeight', type: 'text' },
            { name: 'surfaceFinish', type: 'select', options: [{ label: 'HASL', value: 'hasl'}, { label: 'HASL Lead Free', value: 'hasl-lf'}, { label: 'ENIG', value: 'enig'}, { label: 'OSP', value: 'osp'}] },
            { name: 'soldermaskColor', type: 'text' },
            { name: 'silkscreenColor', type: 'text' },
          ]
        },
        {
          name: 'datasheet',
          type: 'relationship',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'images',
          type: 'relationship',
          relationTo: 'media',
          hasMany: true,
          required: false,
        },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          required: true,
        },
      ],
    },
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'a_very_secure_secret_for_pcb_globe_123',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || `file:${path.resolve(dirname, '../payload.db')}`,
    },
  }),
  sharp,
  debug: true,
})
