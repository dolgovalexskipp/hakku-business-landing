#!/usr/bin/env python3
# Загрузка файла в YC Object Storage (S3-совместимо), public-read.
# Доступы — из _tools/cap.config.json → блок yc_storage (gitignored).
# Запуск (без системных зависимостей, boto3 через uv):
#   uv run --with boto3 python _tools/yc-upload.py <file> <key> [content-type]
# Печатает в stdout публичный URL загруженного объекта.
import json, os, sys
import boto3
from boto3.s3.transfer import TransferConfig
from botocore.config import Config

here = os.path.dirname(os.path.abspath(__file__))
cfg = json.load(open(os.path.join(here, 'cap.config.json')))['yc_storage']

src = sys.argv[1]
key = sys.argv[2]
ctype = sys.argv[3] if len(sys.argv) > 3 else 'application/octet-stream'

s3 = boto3.client(
    's3', endpoint_url=cfg['endpoint'],
    aws_access_key_id=cfg['accessKeyId'], aws_secret_access_key=cfg['secretAccessKey'],
    region_name=cfg.get('region', 'ru-central1'),
    config=Config(signature_version='s3v4', s3={'addressing_style': 'path'}))

tc = TransferConfig(multipart_threshold=8 * 1024 * 1024,
                    multipart_chunksize=16 * 1024 * 1024, max_concurrency=4)
s3.upload_file(src, cfg['bucket'], key,
               ExtraArgs={'ContentType': ctype, 'ACL': 'public-read'}, Config=tc)

print(cfg['publicBase'].rstrip('/') + '/' + key)
