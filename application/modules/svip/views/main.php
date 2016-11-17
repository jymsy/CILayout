<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel='stylesheet' type='text/css' href='<?php echo base_url("/static/css/base.css"); ?>'>
<!--    <link rel='stylesheet' type='text/css' href='--><?php //echo base_url("/static/base.min.css"); ?><!--'>-->
</head>
<body>
    <a href="#" onclick="clicked()">xxxxxxxxxx</a>
    <div class="warrp_v422 clearfix">
    <?php echo $content  ?>
        <div class="leaf-loading"></div>
    </div>

<script src="http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js"></script>
<script src="<?php echo base_url("/static/js/dist/vendors.js"); ?>"></script>
<script src="<?php echo base_url("/static/js/dist/learningcenter.js"); ?>"></script>
</body>
</html>