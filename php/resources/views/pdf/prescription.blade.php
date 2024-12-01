<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đơn Thuốc</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .header {
            text-align: center;
            font-size: 20px;
            margin-bottom: 20px;
        }
        .prescription-info {
            margin: 20px;
        }
        .medications table {
            width: 100%;
            border-collapse: collapse;
        }
        .medications table, .medications th, .medications td {
            border: 1px solid #000;
        }
        .medications th, .medications td {
            padding: 10px;
            text-align: left;
        }
    </style>
</head>
<body>
<div class="header">
    <h1>Đơn Thuốc</h1>
    <p>Phòng khám Diamond</p>
</div>

<div class="prescription-info">
    <p><strong>Bệnh nhân:</strong> {{ $prescription['patient_name'] }}</p>
    <p><strong>Bác sĩ:</strong> {{ $prescription['doctor_name'] }}</p>

    <div class="medications">
        <h3>Danh sách thuốc</h3>
        <table>
            <thead>
            <tr>
                <th>Tên thuốc</th>
                <th>Liều lượng</th>
                <th>Số lượng</th>
            </tr>
            </thead>
            <tbody>
            @foreach ($prescription['medications'] as $medication)
                <tr>
                    <td>{{ $medication['name'] }}</td>
                    <td>{{ $medication['dosage'] }}</td>
                    <td>{{ $medication['quantity'] }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

    <p><strong>Chỉ dẫn:</strong> {{ $prescription['instructions'] }}</p>
</div>
</body>
</html>
