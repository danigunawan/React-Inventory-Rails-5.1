class ContainersController < ApplicationController
  def index
    @paginator = ResultsPaginator.new(Container.all)
  end

  def new
    render json: { new_record: Container.new.as_json(only: [:name, :description]) }
  end

  def create
    new_container = Container.new(container_params)
    if new_container.save
      @paginator = ResultsPaginator.new(Container.all, params[:active_page].presence)
      render json: { containers: @paginator.items, active_page: @paginator.get_current_page, total_pages: @paginator.displayed_page_count }, status: :ok
    else
      render json: { errors: new_container.errors.full_messages.join("<br> ") }, status: :unprocessable_entity
    end
  end

  private
  def container_params
    params.require(:record).permit(:name, :description)
  end

end
