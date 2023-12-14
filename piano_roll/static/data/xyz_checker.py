import matplotlib.pyplot as plt
import numpy as np

def make_img(input_path, img_path):
    # XYZデータ
    xyz_data = []
    with open(input_path, 'r') as file:
        for line in file:
            values = line.split("\t")
            if len(values) == 3:
                x, y, z = map(float, values)
                xyz_data.append((x, y, z))
    print(len(xyz_data))
    # データの抽出
    x = [data[0] for data in xyz_data]
    y = [data[1] for data in xyz_data]
    z = [data[2] for data in xyz_data]

    # 3D散布図をプロット
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')

    # 半透明の球体の描画
    u = np.linspace(0, 2 * np.pi, 100)
    v = np.linspace(0, np.pi, 100)
    y_sphere = 79 * np.outer(np.sin(u), np.sin(v))
    z_sphere = 79 * np.outer(np.ones(np.size(u)), np.cos(v))
    x_sphere = 79 * np.outer(np.cos(u), np.sin(v))
    ax.plot_surface(x_sphere, y_sphere, z_sphere, color='lightblue', alpha=0.5)

    # # カラーマップを選択
    # cmap = plt.get_cmap('gist_rainbow')  # 例として'cool'カラーマップを使用
    # # データポイントに対応するカラーインデックスを取得
    # color_idx = np.linspace(0, 1, len(xyz_data))
    # ax.scatter(x, y, z, c=color_idx, cmap=cmap, marker='o')
    ax.scatter(x, y, z, c="b", marker='o')


    # y軸の描画
    ax.plot([0, 0], [-80, 80], [0, 0], color='g')


    ax.set_xlabel('X軸')
    ax.set_ylabel('Y軸')
    ax.set_zlabel('Z軸')

    plt.savefig(img_path)
    # plt.show()

if __name__ == "__main__":
    make_img()