'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'
import { CheckCircle, ShoppingBag, Home, Package } from 'lucide-react'
import Link from 'next/link'

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-600/20 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-white mb-4">Order Placed Successfully!</h1>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Thank you for your purchase! Your ICE Beacon medical profile devices will be shipped to your address soon. 
            You'll receive an email confirmation with tracking details.
          </p>

          {/* Order Details Card */}
          <Card className="glass-effect border-white/20 max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-center gap-2">
                <Package className="w-5 h-5" />
                What's Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-600/10 rounded-lg">
                  <div className="text-2xl mb-2">📧</div>
                  <h3 className="font-semibold text-white mb-1">Email Confirmation</h3>
                  <p className="text-sm text-slate-300">Check your email for order details</p>
                </div>
                <div className="p-4 bg-purple-600/10 rounded-lg">
                  <div className="text-2xl mb-2">🚚</div>
                  <h3 className="font-semibold text-white mb-1">Shipping</h3>
                  <p className="text-sm text-slate-300">Your order will ship within 2-3 days</p>
                </div>
                <div className="p-4 bg-green-600/10 rounded-lg">
                  <div className="text-2xl mb-2">📱</div>
                  <h3 className="font-semibold text-white mb-1">Setup</h3>
                  <p className="text-sm text-slate-300">Configure your NFC device when it arrives</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg">
                <Home className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/store">
              <Button variant="outline" size="lg">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm">
              Need help? Contact us at{' '}
              <a href="mailto:support@icebeacon.com" className="text-blue-400 hover:text-blue-300">
                support@icebeacon.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
