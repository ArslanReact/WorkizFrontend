<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><?php echo site_settings()->company_name." Admin Panel";?></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="all,follow">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="icon" type="image/png" href="<?=base_url();?>files/backend/images/favicon.ico"/>
    <link rel="stylesheet" href="<?=base_url();?>files/backend/css/all.css">
    <link rel="stylesheet" type="text/css" href="<?=base_url();?>files/backend/css/theme_bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="<?=base_url();?>files/backend/css/theme-style.css">
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
        .nlink{
            padding: 2px 10px 3px !important;
        }
        .dataTables_wrapper .dataTables_info{ float: none;}
        .file-drop-area {
                position: relative;
                display: flex;
                align-items: center;
                width: 100%;
                max-width: 100%;
                margin-top: 10px;
                margin-bottom: 10px;
                padding: 25px;
                border: 1px dashed rgb(226 177 21);
                border-radius: 3px;
                transition: 0.2s;
                &.is-active {: ;
                background-color: rgba(255, 255, 255, 0.05);
                }: ;
            }
.fake-btn {
    flex-shrink: 0;
    background-color: rgb(206 165 35);
    color: white;
    border: 1px dashed rgb(197 159 36);
    border-radius: 3px;
    padding: 8px 15px;
    margin-right: 10px;
    font-size: 16px;
    font-weight: bold;
}
.file-msg {
    font-size: small;
    font-weight: 300;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.file-input {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    opacity: 0;
    &: focus {;
    outline: none;
    }: ;
}
    </style>
</head>
  <body>
    <!-- Side Navbar -->
    <?php $this->load->view(ADMIN_VIEW_FOLDER."/includes/leftbar");?>
    <div class="col-xl-10 col-lg-9">
        <!-- dashboard content -->
        <div class="content-page-admin">
      <!-- navbar-->
      <?php $this->load->view(ADMIN_VIEW_FOLDER."/includes/header");?>
            <div class="col-12 m-b-20 m-t-20"><h4 class="tite-admin"><?=$page_heading;?></h4></div>
            <div class="row m-b-20">
                <div class="col-xl-12">
                    <div class="card">
                <h2 class="display h4">Import Product (For Stock Bulk Updating) <a href="<?php echo base_url() ?>uploads/products_sample.csv" target="_blank" class="ml-2 btn btn-all float-right">Check Sample</a></h2>
                <?php
                $attributes = array('class' => 'form-material card-block', 'enctype' => "multipart/form-data");
                echo form_open_multipart(ADMIN_FOLDER.'/products/add_productdetails_importindb',$attributes);
                ?>
                    <div class="form-row">
                        <div class="col-md-12 m-t-10">
                                <div class="file-drop-area m-0">
                                  <span class="fake-btn">Choose files</span>
                                  <span class="file-msg">Please attach the required documents by clicking in this area.</span>
                                  <input class="file-input" name="getFile" type="file" required="">
                                </div>
                        </div>
                    </div>
                    <div class="m-t-20 row">
                        <div class="col-md-2">
                        <div class="btn-group mt-30px col">
                            <!-- <button type="button" class="btn btn-custopm">Cancel</button> -->
                            <a href="<?php echo base_url(ADMIN_FOLDER."/products/");?>" class="btn btn-all m-r-10">Cancel</a>
                            <button type="submit" class="btn btn-all bg-green float-right">Submit</button>
                        </div>
                        </div>
                    </div>                       
                </form>
              </div>
                </div>
            </div>
      <!-- Updates Section -->
      <?php $this->load->view(ADMIN_VIEW_FOLDER."/includes/footer");?>
    </div>
    </div>
    <!-- JavaScript files-->
    <?php $this->load->view(ADMIN_VIEW_FOLDER."/includes/scripts-bk");?>
  </body>
</html>