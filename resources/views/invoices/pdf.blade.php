<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Invoice {{ $invoice->invoice_number }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Helvetica Neue', sans-serif;
            font-size: 14px;
            color: #333;
            padding: 40px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            border-bottom: 2px solid #4F46E5;
            padding-bottom: 20px;
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #4F46E5;
        }

        .invoice-info {
            text-align: right;
        }

        .invoice-number {
            font-size: 18px;
            font-weight: bold;
            color: #111;
        }

        .invoice-date {
            color: #666;
            margin-top: 5px;
        }

        .parties {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
        }

        .party {
            width: 48%;
        }

        .party-title {
            font-weight: bold;
            margin-bottom: 10px;
            color: #4F46E5;
            text-transform: uppercase;
            font-size: 12px;
        }

        .party-name {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .party-detail {
            color: #666;
            line-height: 1.6;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
        }

        .table th {
            background: #4F46E5;
            color: white;
            padding: 12px;
            text-align: left;
        }

        .table td {
            padding: 12px;
            border-bottom: 1px solid #eee;
        }

        .table .amount {
            text-align: right;
        }

        .totals {
            text-align: right;
            margin-bottom: 40px;
        }

        .total-row {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 8px;
        }

        .total-label {
            width: 150px;
            color: #666;
        }

        .total-value {
            width: 120px;
            font-weight: bold;
            text-align: right;
        }

        .grand-total {
            font-size: 20px;
            color: #4F46E5;
            border-top: 2px solid #4F46E5;
            padding-top: 10px;
        }

        .footer {
            text-align: center;
            color: #999;
            font-size: 12px;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }

        .status {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .status-paid {
            background: #D1FAE5;
            color: #065F46;
        }

        .status-pending {
            background: #FEF3C7;
            color: #92400E;
        }

        .status-overdue {
            background: #FEE2E2;
            color: #991B1B;
        }
    </style>
</head>

<body>
    <div class="header">
        <div class="logo">AribaSaaS</div>
        <div class="invoice-info">
            <div class="invoice-number">{{ $invoice->invoice_number }}</div>
            <div class="invoice-date">Issued: {{ $invoice->issue_date->format('M d, Y') }}</div>
            <div class="invoice-date">Due: {{ $invoice->due_date->format('M d, Y') }}</div>
            <div style="margin-top: 10px;">
                <span class="status status-{{ $invoice->status }}">{{ ucfirst($invoice->status) }}</span>
            </div>
        </div>
    </div>

    <div class="parties">
        <div class="party">
            <div class="party-title">From</div>
            <div class="party-name">AribaSaaS Ltd.</div>
            <div class="party-detail">
                123 Tech Park, Suite 456<br>
                Dhaka 1212, Bangladesh<br>
                support@aribasaas.com
            </div>
        </div>
        <div class="party">
            <div class="party-title">Bill To</div>
            <div class="party-name">{{ $invoice->tenant->name }}</div>
            <div class="party-detail">
                {{ $invoice->tenant->domain }}.aribasaas.com<br>
                {{ $invoice->tenant->config['address'] ?? 'Address not provided' }}
            </div>
        </div>
    </div>

    <table class="table">
        <thead>
            <tr>
                <th>Description</th>
                <th class="amount">Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <strong>Subscription Fee</strong><br>
                    <span style="color: #666; font-size: 12px;">Monthly SaaS Subscription</span>
                </td>
                <td class="amount">৳{{ number_format($invoice->amount, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <div class="totals">
        <div class="total-row">
            <span class="total-label">Subtotal:</span>
            <span class="total-value">৳{{ number_format($invoice->amount, 2) }}</span>
        </div>
        <div class="total-row">
            <span class="total-label">VAT (0%):</span>
            <span class="total-value">৳0.00</span>
        </div>
        <div class="total-row grand-total">
            <span class="total-label">Total Due:</span>
            <span class="total-value">৳{{ number_format($invoice->amount, 2) }}</span>
        </div>
    </div>

    @if($invoice->notes)
        <div style="margin-bottom: 40px; padding: 15px; background: #F3F4F6; border-radius: 8px;">
            <strong>Notes:</strong><br>
            {{ $invoice->notes }}
        </div>
    @endif

    <div class="footer">
        Thank you for your business!<br>
        This is a computer-generated invoice. No signature required.
    </div>
</body>

</html>