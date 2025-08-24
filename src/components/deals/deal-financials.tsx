"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  DollarSign,
  Building2,
  FileText,
  Calculator,
  CreditCard,
  Percent,
  Calendar,
  Download,
} from "lucide-react"

interface DealFinancialsProps {
  id: string
}

// This would normally come from an API
const financials = {
  property: {
    listPrice: 750000,
    offerPrice: 725000,
    appraisalValue: 735000,
    squareFeet: 2500,
    pricePerSqFt: 290,
  },
  loan: {
    type: "Conventional",
    amount: 580000,
    term: 30,
    rate: 3.5,
    points: 0.5,
    downPayment: 145000,
    downPaymentPercent: 20,
  },
  costs: {
    earnestMoney: 10000,
    inspectionFee: 500,
    appraisalFee: 550,
    originationFee: 2900,
    titleFees: 2500,
    recordingFees: 350,
    transferTax: 3625,
    prorations: 1500,
    total: 21925,
  },
  monthly: {
    principal: 2605,
    interest: 895,
    taxes: 625,
    insurance: 175,
    pmi: 0,
    hoa: 0,
    total: 4300,
  },
  documents: [
    {
      id: "1",
      name: "Purchase Agreement",
      type: "PDF",
      date: new Date(2024, 2, 15),
    },
    {
      id: "2",
      name: "Loan Estimate",
      type: "PDF",
      date: new Date(2024, 2, 16),
    },
    {
      id: "3",
      name: "Cost Breakdown",
      type: "Excel",
      date: new Date(2024, 2, 18),
    },
  ],
}

export function DealFinancials({ id }: DealFinancialsProps) {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Financial Details</h3>
          <p className="text-sm text-muted-foreground">
            Track all financial aspects of the deal
          </p>
        </div>
        <Button>
          <Calculator className="mr-2 h-4 w-4" />
          Update Calculator
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h4 className="mb-4 font-medium">Property Value</h4>
            <div className="grid gap-3">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>List Price</span>
                </div>
                <span className="font-medium">
                  ${financials.property.listPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>Offer Price</span>
                </div>
                <span className="font-medium">
                  ${financials.property.offerPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>Appraisal Value</span>
                </div>
                <span className="font-medium">
                  ${financials.property.appraisalValue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>Price per Sq Ft</span>
                </div>
                <span className="font-medium">
                  ${financials.property.pricePerSqFt.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-4 font-medium">Loan Details</h4>
            <div className="grid gap-3">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>Loan Type</span>
                </div>
                <span className="font-medium">{financials.loan.type}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>Loan Amount</span>
                </div>
                <span className="font-medium">
                  ${financials.loan.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Loan Term</span>
                </div>
                <span className="font-medium">{financials.loan.term} years</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  <span>Interest Rate</span>
                </div>
                <span className="font-medium">{financials.loan.rate}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="mb-4 font-medium">Closing Costs</h4>
            <div className="grid gap-3">
              {Object.entries(financials.costs)
                .filter(([key]) => key !== "total")
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {key
                          .split(/(?=[A-Z])/)
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </span>
                    </div>
                    <span className="font-medium">${value.toLocaleString()}</span>
                  </div>
                ))}
              <div className="flex items-center justify-between rounded-lg border bg-muted p-3">
                <div className="font-medium">Total Closing Costs</div>
                <span className="font-medium">
                  ${financials.costs.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-4 font-medium">Monthly Payment</h4>
            <div className="grid gap-3">
              {Object.entries(financials.monthly)
                .filter(([key]) => key !== "total")
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {key
                          .split(/(?=[A-Z])/)
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </span>
                    </div>
                    <span className="font-medium">${value.toLocaleString()}</span>
                  </div>
                ))}
              <div className="flex items-center justify-between rounded-lg border bg-muted p-3">
                <div className="font-medium">Total Monthly Payment</div>
                <span className="font-medium">
                  ${financials.monthly.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div>
        <h4 className="mb-4 font-medium">Financial Documents</h4>
        <div className="grid gap-3">
          {financials.documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{doc.name}</span>
                <Badge variant="secondary">{doc.type}</Badge>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {doc.date.toLocaleDateString()}
                </span>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
